import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  const { userId } = await request.json();

  // 1. Fetch the user's "Liked" movies
  const { data: history } = await supabase
    .from('swipes')
    .select('movie_id, movies(embedding)')
    .eq('user_id', userId)
    .eq('is_like', true)
    .limit(50); // Analyze last 50 likes for performance

  // --- SCENARIO A: COLD START (User has no likes) ---
  if (!history || history.length === 0) {
    console.log("Cold start for user:", userId);
    // Return 10 random popular movies to get them started
    const { data: randomMovies } = await supabase
      .from('movies')
      .select('*')
      .limit(10);
    return NextResponse.json(randomMovies);
  }

  // --- SCENARIO B: ALGORITHM (Content-Based Filtering) ---
  
  // 2. Extract vectors from the history
  // Each 'embedding' is a string "[0.1, 0.2...]", so we parse it.
  const vectors: number[][] = history
    .map((item: any) => JSON.parse(item.movies.embedding))
    .filter((v) => v); // Remove nulls

  if (vectors.length === 0) return NextResponse.json([]);

  // 3. Calculate "Average User Vector" (The Math)
  // We sum up all vectors and divide by the count.
  const vectorSize = vectors[0].length; // usually 384
  const userVector = new Array(vectorSize).fill(0);

  for (const vec of vectors) {
    for (let i = 0; i < vectorSize; i++) {
      userVector[i] += vec[i];
    }
  }
  // Divide by count to get average
  const avgUserVector = userVector.map(val => val / vectors.length);

  // 4. Call Supabase RPC to find nearest neighbors
  const { data: recommendations } = await supabase.rpc('match_movies', {
    query_embedding: avgUserVector, // The calculated average
    match_threshold: 0.3,           // Similarity strictness
    match_count: 5,                 // How many to fetch
    user_id_input: userId           // Exclude seen movies
  });

  return NextResponse.json(recommendations);
}