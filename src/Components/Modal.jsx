import React, { useState } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleModal,
  addData,
  setPath,
  setDirData,
  renameData,
} from "../redux/fileSystemSlice/fileSystemSlice";

Modal.setAppElement("#root");
const CustomModal = () => {
  const [activeTab, setActiveTab] = useState("File");
  const [newName, setnewName] = useState("");
  const modalIsOpen = useSelector((state) => state.fileSystem.modalIsOpen);
  const modalType = useSelector((state) => state.fileSystem.modalType);
  const gpath = useSelector((state) => state.fileSystem.path);
  const reName = useSelector((state) => state.fileSystem.renameItemName);
  const dispatch = useDispatch();

  const mstyle = {
    content: {
      width: "350px",
      color: "black",
      marginLeft: "auto",
      marginRight: "auto",
      height: "250px",
      borderRadius: "0.75rem",
    },
  };

  return (
    <div>
      <button onClick={() => dispatch(toggleModal(modalIsOpen))}></button>
      <div className="mx-auto rounded-xl">
        <Modal style={mstyle} isOpen={modalIsOpen} contentLabel="Example Modal">
          {modalType && (
            <div className="justify-center items-center text-center">
              <button
                className="float-right "
                onClick={() => dispatch(toggleModal(modalIsOpen))}
              >
                <img className=" w-4 h-4" src="/assets/close.png" alt="" />
              </button>

              <div className="text-xl pt-4">Create new</div>
              <div className="">
                {" "}
                <div
                  role="tablist"
                  className="tabs tabs-boxed w-[240px] mx-auto bg-white"
                >
                  <a
                    role="tab"
                    className={activeTab === "File" ? "tab tab-active " : "tab"}
                    onClick={() => {
                      const temp = activeTab === "File" ? "Folder" : "File";
                      setActiveTab(temp);
                    }}
                  >
                    <div className="w-[70px] "> File</div>
                  </a>
                  <div className="tab-content mx-auto px-auto py-4">
                    {" "}
                    <input
                      type="text"
                      placeholder="File name"
                      className="input input-bordered w-[180px] px-auto"
                      onChange={(e) => {
                        setnewName(e.target.value);
                      }}
                    />
                  </div>
                  <a
                    role="tab"
                    className={
                      activeTab === "Folder" ? "tab tab-active" : "tab "
                    }
                    onClick={() => {
                      const temp = activeTab === "File" ? "Folder" : "File";
                      setActiveTab(temp);
                    }}
                  >
                    <div className="w-[70px]"> Folder</div>
                  </a>
                  <div className="tab-content mx-auto px-auto py-4">
                    {" "}
                    <input
                      type="text"
                      placeholder="Folder name"
                      className="input input-bordered w-[180px]"
                      onChange={(e) => {
                        setnewName(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    //create new folder or file
                    if (newName.length >= 1) {
                      const newNode = {
                        name: newName,
                        type: activeTab.toLowerCase(),
                      };
                      dispatch(addData(newNode));
                      dispatch(toggleModal(modalIsOpen));
                      dispatch(setPath(gpath.join("/")));
                      dispatch(setDirData({ path: gpath.join("/"), newName }));
                    } else {
                      alert("Please enter a name");
                    }
                  }}
                  className="w-60 bg-[#4a00ff] rounded-lg py-2 text-white"
                >
                  Add
                </button>
              </div>
            </div>
          )}
          {!modalType && (
            <div className="justify-center items-center">
              <div className="justify-center items-center text-center">
                <button
                  className="float-right "
                  onClick={() => dispatch(toggleModal(modalIsOpen))}
                >
                  <img className=" w-4 h-4" src="/assets/close.png" alt="" />
                </button>

                <div className="text-xl pt-4">Rename</div>
                <input
                  type="text"
                  placeholder={reName}
                  className="input input-bordered w-[180px] my-6"
                  onChange={(e) => {
                    setnewName(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    //rename the file/folder
                    if (newName.length >= 1) {
                      dispatch(
                        renameData({
                          name: newName,
                          path: gpath,
                          oldname: reName,
                        })
                      );
                      dispatch(toggleModal(modalIsOpen));
                      dispatch(setDirData({ path: gpath.join("/"), newName }));
                    } else {
                      alert("Please enter a name");
                    }
                  }}
                  className="w-40 bg-[#4a00ff] rounded-lg py-2 text-white"
                >
                  Rename
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CustomModal;
