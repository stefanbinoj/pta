import  React from 'react';
import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import { Colors } from '../../ui/colors.ts';
import { shortAsciiLogo, longAsciiLogo } from './AsciiArts.ts';

interface HeaderProps {
    version: string;
    nightly: boolean;
}

export const Header: React.FC<HeaderProps> = ({
    version,
    nightly,
}) => {

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
            {nightly && (
                <Box width="100%" flexDirection="row" justifyContent="flex-end">
                    {Colors.GradientColors ? (
                        <Gradient colors={Colors.GradientColors}>
                            <Text>v{version}</Text>
                        </Gradient>
                    ) : (
                        <Text>v{version}</Text>
                    )}
                </Box>
            )}
        </Box>
    );
};
