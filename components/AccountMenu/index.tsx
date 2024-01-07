import * as React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FcGoogle, FcHome, FcReadingEbook } from "react-icons/fc";
import { signIn, useSession, signOut } from "next-auth/react";
import { IoPersonCircle } from "react-icons/io5";
import { localStorage } from "@/utils/localStorage";

export default function AccountMenu() {
  const { status, data: session } = useSession();
  const router = useRouter();
  const authenticated = status === "authenticated";
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const aiPageDataFromLocalStorage = localStorage.getItem(
    "aiPageData",
  ) as string;
  const dataExist = aiPageDataFromLocalStorage?.length > 0;
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnNavigateHome = () => {
    setAnchorEl(null);
    router.push("/");
  };

  const handleOnNavigateToStory = () => {
    setAnchorEl(null);
    router.push("/story");
  };

  const handleOnAuthClick = async () => {
    setAnchorEl(null);
    if (authenticated) {
      await signOut({
        callbackUrl: "/",
      });
      localStorage.clear();
    } else {
      router.push("/signin");
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}>
            {session?.user?.image ? (
              <Avatar alt="user image" src={session.user.image} />
            ) : (
              <IoPersonCircle size={"3rem"} />
            )}
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <MenuItem onClick={handleOnNavigateHome}>
          <ListItemIcon>
            <FcHome size="1.5rem" />
          </ListItemIcon>
          Home
        </MenuItem>
        {dataExist && (
          <MenuItem onClick={handleOnNavigateToStory}>
            <ListItemIcon>
              <FcReadingEbook size={"1.5rem"} />
            </ListItemIcon>
            {`Your Fairy Tale`}
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={handleOnAuthClick}>
          <ListItemIcon>
            <FcGoogle size={"1.5rem"} />
          </ListItemIcon>
          {authenticated ? "Sign Out" : "Sign In"}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
