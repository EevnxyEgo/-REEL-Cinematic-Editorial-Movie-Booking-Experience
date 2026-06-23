import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getFilm } from "@/lib/tmdb";
import { DetailView } from "@/components/detail/DetailView";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const { id } = await props.params;
  const { film } = await getFilm(id);
  if (!film) return { title: "Not in the programme — REEL" };
  return {
    title: `${film.title} (${film.year}) — REEL`,
    description: film.overview,
  };
}

export default async function FilmDetailPage(props: { params: Params }) {
  const { id } = await props.params;
  const { film, source } = await getFilm(id);
  if (!film) notFound();

  return <DetailView film={film} source={source} />;
}
