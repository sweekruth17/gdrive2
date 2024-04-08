import React from "react";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import { useSelector, useDispatch } from "react-redux";
import {
  addData,
  renameData,
  deleteData,
  toggleModalType,
  toggleModal,
  setDirData,
  setRenameData,
} from "../redux/fileSystemSlice/fileSystemSlice";
const MenuItemContainer = ({ children }) => {
  return (
    <div className="  pl-4 pr-12 py-2 z-30   border-b-[2px] hover:rounded-lg hover:bg-slate-300">
      {children}
    </div>
  );
};

const Menu = ({ item, children, onRenameClick, onClickDelete }) => {
  const { id, name, path, type } = item;
  //   console.log(id);
  const modalSwitch = useSelector((state) => state.fileSystem.modalIsOpen);
  const dispatch = useDispatch();
  return (
    <>
      <ContextMenuTrigger id={id}>{children}</ContextMenuTrigger>
      <ContextMenu
        className="cursor-pointer shadow-lg  rounded-lg bg-slate-100 hover:rounded-lg"
        id={id}
      >
        <MenuItemContainer>
          {" "}
          <MenuItem
            onClick={() => {
              dispatch(setRenameData(name));
              dispatch(toggleModalType(false));
              dispatch(toggleModal(modalSwitch));
              //   dispatch(renameData(item));
            }}
          >
            Rename
          </MenuItem>
        </MenuItemContainer>

        <MenuItem divider />
        <MenuItemContainer>
          <MenuItem
            onClick={() => {
              let pathArr = path.split("/");
              pathArr = pathArr.slice(0, pathArr.length - 1);
              dispatch(deleteData({ name, type, id, path: pathArr }));
              dispatch(setDirData({ path:pathArr.join('/'), name }));
            }}
          >
            Delete
          </MenuItem>
        </MenuItemContainer>
      </ContextMenu>
    </>
  );
};

export default Menu;
