import { CSSProperties } from 'react';
import { useRoutes } from 'react-router-dom';
import { GamesContainer } from '../components/games/games';
import { Template } from '../components/template/template';
import {
    routeUrls,
} from '../constants';

export const DefaultRouter = () => {
    const routeNotMappedStyles: CSSProperties = { color: 'darkgray', padding: '32px', fontSize: '20px' };

    return useRoutes([
        {
            path: routeUrls.HOME,
            element: <Template component={() => <GamesContainer /> } />,
            // element: <Template component={() => <HomeContainer />} />,
        },
    ]);
};
