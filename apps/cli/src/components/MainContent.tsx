import React from "react";
import { Static } from "ink";
import { Header } from "../ui/components/header.tsx";

export const MainContent = () => {
    return (
        <>
            <Static items={[<Header />]}>{(item) => item}</Static>
        </>
    );
};
