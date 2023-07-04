export default function NumberPost(props) {
    const { setPostNumber } = props;
  
    const handleSelectChange = (event) => {
      const selectedValue = event.target.value;
      setPostNumber(selectedValue);
    };
  
    return (
      <select
        className="border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        onChange={handleSelectChange}
      >
        <option value="" selected disabled>
          Show
        </option>
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="20">20</option>
      </select>
    );
  }
  