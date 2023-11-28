import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { FcGoogle, FcHome } from "react-icons/fc";
import { signIn, useSession, signOut } from "next-auth/react";
import { localStorage } from "@/utils/localStorage";

export default function SwipeDrawer() {
  const router = useRouter();
  const { status, data: session } = useSession();
  const authenticated = status === "authenticated";
  const [isOpen, setIsOpen] = React.useState(false);

  const currentPage = usePathname();

  const isStoryPage = currentPage?.includes("/story");

  const handleOnNavigateHome = () => router.push("/");

  const handleOnAuthClick = async () => {
    if (authenticated) {
      await signOut({
        callbackUrl: "/",
      });
      localStorage.clear();
    } else {
      router.push('/signin')
    }
  };

  const authArray = authenticated ? ["Sign Out"] : ["Sign In"];

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setIsOpen(open);
    };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}>
      <List>
        {["Home"].map((text, index) => (
          <ListItem key={text} disablePadding onClick={handleOnNavigateHome}>
            <ListItemButton>
              <ListItemIcon>
                <FcHome size="1rem" />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {authArray.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={handleOnAuthClick}>
              <ListItemIcon>
                <FcGoogle size={"1rem"} />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {isOpen ? null : (
        <button
          type="button"
          title="open menu left"
          onClick={toggleDrawer(true)}
          className={`flex flex-col space-y-2 p-2 m-4 bg-white opacity-10 `}>
          <span className="block w-8 h-0.5 bg-black"></span>
          <span className="block w-8 h-0.5 bg-black"></span>
          <span className="block w-8 h-0.5 bg-black"></span>
        </button>
      )}
      <SwipeableDrawer
        className={`${isStoryPage ? "opacity-[0.96]" : "opacity-50"}`}
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}>
        {list}
      </SwipeableDrawer>
    </div>
  );
}
