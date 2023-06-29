export default function HatTrick(props) {
    const {setContent, setTitle, title, content, titleState} = props;

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
      };
    
      const handleContentChange = (event) => {
        setContent(event.target.value);
      };


    return ( 
        <div>
        <h2 className="font-bold text-2xl ">
            {titleState}
          </h2>
          <div className="mb-1 mt-4 ">Title</div>
          <input
            maxLength={53}
            value={title}
            onChange={handleTitleChange}
            className="inputcss"
            type="text"
            placeholder=" Hello World"
          ></input>
          <div className="mb-1 mt-4 ">Content</div>
          <textarea
             maxLength={418}
            value={content}
            onChange={handleContentChange}
            className="inputcss h-[80px]"
            type="text"
            placeholder=" Content Here"
          ></textarea>
          </div>
    )
    
};
