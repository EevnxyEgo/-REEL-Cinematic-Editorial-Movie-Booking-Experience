import { getFilms } from "@/lib/tmdb";
import { FeaturedHero } from "@/components/home/FeaturedHero";
import { TitleMarquee } from "@/components/home/TitleMarquee";
import { PosterBento } from "@/components/home/PosterBento";
import { ProgrammeIndex } from "@/components/home/ProgrammeIndex";

export default async function HomePage() {
  const { films, source } = await getFilms();
  const featured = films[0];
  const bento = films.slice(1, 5);
  const rest = films.slice(5);

  return (
    <>
      <FeaturedHero film={featured} source={source} />
      <TitleMarquee films={films} />
      <PosterBento films={bento} startIndex={1} />
      {rest.length > 0 && <ProgrammeIndex films={rest} startIndex={5} />}
    </>
  );
}
