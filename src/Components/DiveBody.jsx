import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Folder from "./Folder";
import File from "./File";
import ContextMenu from "./ContextMenu";
import {
  addData,
  renameData,
  deleteData,
  toggleModal,
  toggleModalType,
  setDirData,
} from "../redux/fileSystemSlice/fileSystemSlice";
import CustomModal from "./Modal";

// export const gset = (path, name) => {
//   const dispatch = useDispatch();
//   dispatch(setDirData({ path, name }));
// };
const DiveBody = () => {
  const fileSystem = useSelector((state) => state.fileSystem.currentData);
  const [currentDir, setCurrentDir] = useState(fileSystem);
  const modalSwitch = useSelector((state) => state.fileSystem.modalIsOpen);
  const dispatch = useDispatch();

  useEffect(() => {}, [currentDir]);
  return (
    <>
      <div className="flex flex-wrap gap-x-3 gap-y-3 px-6 mt-8">
        {fileSystem.map((item) => {
          return (
            <div key={item.id}>
              {item.type === "folder" ? (
                <ContextMenu item={item}>
                  <Folder
                    item={item}
                    currentDir={currentDir}
                    setCurrentDir
                  ></Folder>
                </ContextMenu>
              ) : (
                <ContextMenu item={item}>
                  <File item={item}></File>
                </ContextMenu>
              )}
            </div>
          );
        })}
        <div className="p-1 mx-6">
          <button
            onClick={() => {
              dispatch(toggleModalType(true));
              dispatch(toggleModal(modalSwitch));
            }}
          >
            <img src="/assets/add_new_button.png" alt="" />
          </button>
        </div>
        <CustomModal></CustomModal>
      </div>
    </>
  );
};

export default DiveBody;
