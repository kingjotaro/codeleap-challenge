export default function InputUser(props) {
  const { username, setUsername, usernameWarm, setUsernameWarn } = props;

  const redAlert = filter(username) > 0 && filter(username) <= 2;

  function filter(username) {
    return username.replace(/ /g, "").length;
  }

  const handleInputChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <label>
      <input
        minLength={3}
        maxLength={16}
        value={username}
        onChange={handleInputChange}
        className="inputcss"
        type="text"
        placeholder=" John Doe"
      />

      {redAlert && (
        <p className="text-red-500 -mb-6">
          Username should have at least 3 character
        </p>
      )}
    </label>
  );
}
