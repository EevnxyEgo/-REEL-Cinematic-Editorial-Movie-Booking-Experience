import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getFilm } from "@/lib/tmdb";
import { getShowDays } from "@/lib/showtimes";
import { BookingFlow } from "@/components/booking/BookingFlow";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { id } = await props.params;
  const { film } = await getFilm(id);
  return { title: film ? `Book — ${film.title} — REEL` : "Book — REEL" };
}

export default async function BookPage(props: { params: Params }) {
  const { id } = await props.params;
  const { film } = await getFilm(id);
  if (!film) notFound();

  const days = getShowDays(film.id);
  return <BookingFlow film={film} days={days} />;
}
