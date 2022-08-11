import { useCallback } from 'react';

import {
  ActionMenu,
  Grid,
  Item,
  Provider,
  Section,
  Text,
  View,
} from '@adobe/react-spectrum';
import User from '@spectrum-icons/workflow/User';

import { CurrentUser, useAuth } from '@redwoodjs/auth';
import { navigate, NavLink, routes } from '@redwoodjs/router';

import './MainMenu.scss';

const AuthenticatedMainMenu = (props: { user: CurrentUser }) => {
  const { logOut } = useAuth();
  const handleDropdownSelection = useCallback(
    (key: string) => {
      switch (key) {
        case 'org-users': {
          navigate(routes.home());
          break;
        }

        case 'org-integrations': {
          navigate(routes.integrations());
          break;
        }

        case 'org-settings': {
          navigate(routes.settings());
          break;
        }

        case 'logout': {
          logOut();
          break;
        }
      }
    },
    [logOut]
  );

  return (
    <Grid
      width="100%"
      height="100%"
      columns={['auto', 'auto', 'auto', 'auto', 'auto']}
      alignContent="center"
      alignItems="center"
      justifyItems="center"
    >
      <View>
        <NavLink
          className="main-menu__link"
          activeClassName="main-menu__link--active"
          to={routes.home()}
        >
          <img src="/two-ravens.svg" alt="TWO RAVENS" />
        </NavLink>
      </View>
      <View></View>
      <View>
        <NavLink
          className="main-menu__link"
          activeClassName="main-menu__link--active"
          to={routes.home()}
        >
          Explore Public Map
        </NavLink>
        <NavLink
          className="main-menu__link"
          activeClassName="main-menu__link--active"
          to={routes.cameraTraps()}
        >
          Camera Traps
        </NavLink>
        <NavLink
          className="main-menu__link"
          activeClassName="main-menu__link--active"
          to={routes.cameraTrapBatches()}
        >
          Photo Batches
        </NavLink>
      </View>
      <View></View>
      <View>
        <NavLink
          className="main-menu__link"
          activeClassName="main-menu__link--active"
          to={routes.home()}
        >
          <Text>
            <User /> {props?.user?.email}
          </Text>
        </NavLink>
        <ActionMenu
          onAction={handleDropdownSelection}
          alignSelf="center"
          position="absolute"
          marginTop="-3px"
        >
          <Section title="Organisation">
            <Item key="org-users">Users</Item>
            <Item key="org-integrations">Integrations</Item>
            <Item key="org-settings">Settings</Item>
          </Section>
          <Section title="User">
            <Item key="logout">Logout</Item>
          </Section>
        </ActionMenu>
      </View>
    </Grid>
  );
};

const UnAuthenticatedMainMenu = () => {
  return (
    <Grid
      width="100%"
      height="100%"
      columns={['auto', 'auto', 'auto', 'auto', 'auto']}
      alignContent="center"
      alignItems="center"
      justifyItems="center"
    >
      <View>
        <NavLink
          className="main-menu__link"
          activeClassName="main-menu__link--active"
          to={routes.home()}
        >
          LOGO
        </NavLink>
      </View>
      <View></View>
      <View></View>
      <View></View>
      <View>
        <NavLink
          className="main-menu__link"
          activeClassName="main-menu__link--active"
          to={routes.login()}
        >
          Login
        </NavLink>
      </View>
    </Grid>
  );
};

const MainMenu = () => {
  const auth = useAuth();
  if (auth.isAuthenticated) {
    return (
      <Provider height="100%" colorScheme="dark">
        <AuthenticatedMainMenu user={auth.currentUser} />
      </Provider>
    );
  }
  return (
    <Provider height="100%" colorScheme="dark">
      <UnAuthenticatedMainMenu />
    </Provider>
  );
};

export default MainMenu;
