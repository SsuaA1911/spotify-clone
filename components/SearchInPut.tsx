"use client";
import qs from "query-string";
import useDebounce from '@/hooks/useDebounce';

import React, { useEffect, useState } from 'react'
import Input from "./Input";
import { useRouter } from "next/navigation";

const SearchInPut = () => {
    const router = useRouter();
    const [value, setValue] = useState<string>("");
    const deboucnedValue = useDebounce<string>(value,500);

    useEffect(()=>{
        const query ={
            title: deboucnedValue, 
        };

        const url = qs.stringifyUrl({
            url: '/search',
            query: query
        });

        router.push(url);
    },[deboucnedValue, router]);

  return (
    <Input
    placeholder="What do you want to listen to ? "
    value={value}
    onChange={(e) => setValue(e.target.value)}
     />

  );
}

export default SearchInPut;