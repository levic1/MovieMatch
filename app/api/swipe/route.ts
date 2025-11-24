import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/supabase';

export async function POST(request: Request) {
  const body = await request.json();
  const { userId, movieId, isLike } = body;

  const { error } = await supabase
    .from('swipes')
    .insert({
      user_id: userId,
      movie_id: movieId,
      is_like: isLike
    });

  if (error) {
    // If error is "duplicate key", it means they already swiped. Ignore it.
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}