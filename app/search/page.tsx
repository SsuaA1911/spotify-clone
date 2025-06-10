import getSongsByTitle from "@/actions/getSongsByTile";
import Header from "@/components/Header";
import SearchInPut from "@/components/SearchInPut";
import SearchContent from "./components/SearchConten";

interface Props {
  searchParams: {
    title: string;
  };
}

const Search = async ({ searchParams }: Props) => {
  const songs = await getSongsByTitle(searchParams?.title || "");
  return (
    <div
      className="
    bg-neutral-900
    rounded-lg
    h-full
    w-full
    overflow-hidden
    overflow-y-auto
    "
    >
      <Header className="from-bg-neutral-900">
        <div className="mb-2 flex-col gap-y-6">
          <h1 className=" text-white text-3xl font-semibold">Search</h1>
          <SearchInPut />
        </div>
      </Header>
      <SearchContent song={songs} />
    </div>
  );
};
export default Search;
