const File = ({ item }) => {
  const { id, name } = item;
  return (
    <div className="pt-2.5 mx-6">
      <button>
        {" "}
        <img className="w-[70px] h-[80px]" src="/assets/file.png" alt="" />
        {name}
      </button>
    </div>
  );
};

export default File;
