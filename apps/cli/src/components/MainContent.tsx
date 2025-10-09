import React from "react";
import { Header } from "../ui/components/header.tsx";
import { useUIState } from "../context/UIStateContext.tsx";

export const MainContent = React.memo(() => {
    const { messageQueue } = useUIState();
    const showHeader = (messageQueue?.length || 0) <= 5;

    return (
        <>
            {showHeader ? <Header /> : null}
        </>
    );
});

MainContent.displayName = "MainContent";
