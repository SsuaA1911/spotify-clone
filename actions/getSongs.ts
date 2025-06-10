import type {Song} from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getSongs = async (limit = 50): Promise <Song[]> =>{
const supabase = createServerComponentClient({
    cookies: await cookies
});

const{data,error} =await supabase
.from('songs')
.select('*')
.order('created_at',{ascending: false})
.limit(limit);

if(error){
    console.log(error);
}
return (data as Song[]) || [] ;
};

export default getSongs;