import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
} from "@chakra-ui/react";
import {
  FiBarChart2,
  FiTable,
  FiFileText,
  FiSun,
  FiMenu,
  FiBell,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { NavLink } from "react-router-dom";
import { ReactText } from "react";
import AllRoutes from "../AllRoutes/AllRoutes";

interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

const LinkItems: Array<LinkItemProps> = [
  { name: "Charts", icon: FiBarChart2, path: "/home" },
  { name: "Table", icon: FiTable, path: "/table" },
  { name: "Reports", icon: FiFileText, path: "/report" },
  { name: "ForeCast", icon: FiSun, path: "/forcast" },
];

export default function SidebarWithHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box className="min-h-screen bg-red-100 dark:bg-gray-900">
      <SidebarContent
        onClose={onClose}
        display={{ base: "none", md: "block" }}
      />

      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* Mobile nav */}
      <MobileNav onOpen={onOpen} onClose={onClose} />
      <Box className="ml-0 md:ml-60 p-4 mt-20 md:mt-0">
        <AllRoutes />
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      className="transition-all ease-in-out bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 w-full md:w-60 fixed h-full"
      {...rest}
    >
      <Flex className="h-20 items-center mx-8 justify-between">
        <Text className="text-2xl font-monospace font-bold">Kaptive</Text>
        <CloseButton
          className="flex md:hidden"
          onClick={onClose}
          display={{ base: "flex", md: "none" }} // Display close button only on small screens
        />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} path={link.path}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  path: string;
}

const NavItem = ({ icon, children, path, ...rest }: NavItemProps) => {
  return (
    <NavLink
      to={path}
      style={{ textDecoration: "none" }}
      className="focus:outline-none"
    >
      <Flex
        align="center"
        className="p-4 mx-4 rounded-lg group cursor-pointer hover:bg-cyan-400 hover:text-white"
        {...rest}
      >
        {icon && (
          <Icon className="mr-4 text-2xl group-hover:text-white" as={icon} />
        )}
        {children}
      </Flex>
    </NavLink>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  onClose: () => void; // Add onClose function prop
}

const MobileNav = ({ onOpen,  ...rest }: MobileProps) => {
  return (
    <Flex
      className="ml-0 md:ml-60 px-4 md:px-4 h-20 items-center bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 justify-between md:justify-end"
      {...rest}
    >
      <IconButton
        className="flex md:hidden"
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text className="flex md:hidden text-2xl font-monospace font-bold">
        Logo
      </Text>

      <HStack className="space-x-0 md:space-x-6">
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems="center">
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size="sm"
                  src={"https://avatars.githubusercontent.com/u/151566432?v=4"}
                />
                <VStack className="hidden md:flex items-start space-y-1 ml-2">
                  <Text className="text-sm">Raushan Kumar</Text>
                  <Text className="text-xs text-gray-600">Admin</Text>
                </VStack>
              </HStack>
            </MenuButton>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
