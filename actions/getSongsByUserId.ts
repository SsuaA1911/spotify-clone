import type {Song} from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

const getSongsByUserId = async (): Promise <Song[]> =>{
const supabase = createServerComponentClient({
    cookies: await cookies
});

const{
    data: { user },
    error: userError
} = await supabase.auth.getUser();

if(userError || !user){
    console.log(userError?.message || 'No user found');
    return[];
}

const {data, error} = await supabase
.from('songs')
.select('*')
.eq('user_id', user.id)
.order('created_at', {ascending: false});

if(error){
    console.log(error.message);
    return [];
}
return (data as Song[]) || [];

};


export default getSongsByUserId;