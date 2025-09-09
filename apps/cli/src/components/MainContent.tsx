import React from "react";
import { Static } from "ink";
import { Header } from "../ui/components/header.tsx";

export const MainContent = () => {
    return (
        <>
            <Static items={[<Header nightly={true} version={"22"} />]}>
                {(item) => item}
            </Static>
        </>
    );
};
