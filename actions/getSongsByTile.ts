import type {Song} from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import getSongs from "./getSongs";

const getSongsByTitle = async (title:string, limit = 20): Promise <Song[]> =>{
const supabase = createServerComponentClient({
    cookies: await cookies
});

if(!title){
    const allSongs = await getSongs(limit);
    return allSongs;
}

// Note: Search is public, no need to authenticate user

// Optimize search: use full-text search if possible, otherwise limit results
const {data, error} = await supabase
.from('songs')
.select('*')
.ilike('title', `%${title}%`)
.order('created_at', {ascending: false})
.limit(limit);

if(error){
    console.log(error.message);
}

return (data as Song[]) || [];

};


export default getSongsByTitle;