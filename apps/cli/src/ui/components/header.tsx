import React from "react";
import { Box, Text } from "ink";
import Gradient from "ink-gradient";
import { Colors } from "../../ui/colors.ts";
import { shortAsciiLogo, longAsciiLogo } from "./AsciiArts.ts";

export const Header = () => {
    return (
        <Box
            alignItems="flex-start"
            width="100%"
            flexShrink={0}
            flexDirection="column"
        >
            {Colors.GradientColors ? (
                <Gradient colors={Colors.GradientColors}>
                    <Text>{longAsciiLogo}</Text>
                </Gradient>
            ) : (
                <Text>{shortAsciiLogo}</Text>
            )}
        </Box>
    );
};
