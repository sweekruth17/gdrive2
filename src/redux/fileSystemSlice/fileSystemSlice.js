import { createSlice } from "@reduxjs/toolkit";
import filedata from "../../fileSystem.json";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  data: filedata,
  currentData: filedata[0].children,
  path: ["root"],
  modalIsOpen: false,
  modalType: true,
  renameItemName: "",
  modalData: {
    createNew: true,
    activeTab: "File",
    newName: "",
  },
};
const getUUId = () => {
  return uuidv4().toString();
};

const getDir = (data, pathArr) => {
  let nodes = data;
  console.log("pathArr", pathArr);
  for (let i = 0; i < pathArr.length; i++) {
    const currPath = pathArr[i];
    const currDir = nodes.filter((item) => item.name === currPath);
    console.log("currentd", currDir);
    nodes = currDir[0].children;
  }
  console.log("getDirNodes", nodes);
  return nodes;
};
const updateChildrenForFolder = (currDir, newChildren, oldData) => {
  return oldData.map((data) => {
    if (data.name === currDir) {
      // console.log("new data set", currDir);
      data.children = newChildren;
      return data;
    } else if (data.type === "folder") {
      return {
        ...data,
        children: updateChildrenForFolder(
          currDir,
          newChildren,
          data.children || []
        ),
      };
    } else {
      return data;
    }
  });
};

export const fileSystemSlice = createSlice({
  name: "filesystem",
  initialState,
  reducers: {
    //add new files and folders
    addData: (state, actions) => {
      const pathArr = state.path;
      if (actions.payload.name) {
        const { name, type } = actions.payload;
        const oldDir = getDir(state.data, pathArr) || [];
        console.log(oldDir);
        let newData = {};
        if (type === "folder") {
          const tempPath = [...state.path, name];
          newData = {
            id: getUUId(),
            path: tempPath.join("/"),
            type: type,
            name: name,
            children: type === "folder" && [],
          };
        } else {
          const tempPath = [...state.path, name];
          console.log(tempPath.join("/"));
          newData = {
            id: getUUId(),
            path: tempPath.join("/"),
            type: type,
            name: name,
          };
        }
        const temp = [...oldDir, newData];
        console.log("temp", temp);
        const currDir = pathArr[pathArr.length - 1];
        const oldData = JSON.parse(JSON.stringify(state.data));
        console.log("oldData", oldData);
        const newTemp = updateChildrenForFolder(currDir, temp, oldData);
        console.log("newTemp", newTemp);
        state.data = newTemp;
        state.currentData = newTemp;
      }
    },
    //we have to give it
    deleteData: (state, actions) => {
      console.log("deleteData", actions.payload);
      const pathArr = actions.payload.path;
      const oldDir = getDir(state.data, pathArr) || [];
      console.log("oldDir", oldDir);
      const temp = oldDir.filter((node) => node.name !== actions.payload.name);
      console.log("temp", temp);
      const currDir = pathArr[pathArr.length - 1];
      const oldData = JSON.parse(JSON.stringify(state.data));
      const newTemp = updateChildrenForFolder(currDir, temp, oldData);
      state.data = newTemp;
      state.currentData = newTemp;
    },
    //it takes new name and old name,path
    renameData: (state, actions) => {
      const newName = actions.payload.name;
      const pathArr = actions.payload.path;
      const oldname = actions.payload.oldname;
      if (actions.payload.name) {
        const oldDir = getDir(state.data, pathArr) || [];
        console.log("oldDir", oldDir);
        const temp = oldDir.map((node) => {
          console.log(node);
          if (oldname === node.name) {
            const nodePath =
              node.path
                .split("/")
                .slice(0, node.path.length - 1)
                .join("/") +
              "/" +
              newName;
            return {
              path: nodePath,
              name: newName,
              type: node.type,
              children: node.children,
            };
          }
          return node;
        });
        const currDir = pathArr[pathArr.length - 1];
        const oldData = JSON.parse(JSON.stringify(state.data));
        const newTemp = updateChildrenForFolder(currDir, temp, oldData);
        console.log("newTemp", newTemp);
        state.data = newTemp;
        state.currentData = newTemp;
      }
    },
    setDirData: (state, actions) => {
      console.log("hello");
      // console.log("setDirData", actions.payload.path);
      const pathArr = actions.payload.path.split("/");
      if (pathArr.length > 0) {
        let nodes = state.data;
        for (let i = 0; i < pathArr.length; i++) {
          const currPath = pathArr[i];
          const currDir = nodes.filter((item) => item.name === currPath);
          nodes = currDir[0].children;
        }
        // console.log("setDirData", nodes);
        state.currentData = nodes;
      }
    },
    //takes path array
    setPath: (state, actions) => {
      const path = actions.payload;
      // console.log("insetpath", path);
      const pathArr = path.split("/");
      // console.log("insetpatharr", pathArr);
      state.path = pathArr;
      // console.log(path);
    },
    backPath: (state, actions) => {
      const temp = [...actions.payload];
      temp.pop();
      state.path = temp;
      console.log("backPath", state.path);
    },
    toggleModal: (state, actions) => {
      console.log("modalswitch", !actions.payload);
      state.modalIsOpen = !actions.payload;
    },
    toggleModalType: (state, actions) => {
      console.log("modaltypeswitch", actions.payload);
      state.modalType = actions.payload;
    },
    getCurrentDir: (state, actions) => {},
    setRenameData: (state, actions) => {
      const name = actions.payload;
      console.log("renameItemName", name);
      state.renameItemName = name;
    },
  },
});
export const {
  addData,
  deleteData,
  renameData,
  setDirData,
  setPath,
  backPath,
  toggleModal,
  toggleModalType,
  getCurrentDir,
  setRenameData,
} = fileSystemSlice.actions;
export default fileSystemSlice.reducer;
