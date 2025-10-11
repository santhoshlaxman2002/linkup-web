import { useState, useEffect } from "react";
import { Input, Dropdown, Menu } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone, LoadingOutlined } from "@ant-design/icons";
import { validateUsername } from "../api/auth";

export function UsernameField({ values, handleChange, setFieldValue, isUsernameLocked, setIsUsernameLocked }) {
  const [isValidating, setIsValidating] = useState(false);
  const [isUnique, setIsUnique] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [debounceTimer, setDebounceTimer] = useState(null);

  useEffect(() => {
    if (values.username && values.username.length > 1) {  
      if (debounceTimer) clearTimeout(debounceTimer);

      const timer = setTimeout(async () => {
        setIsValidating(true);
        try {
          const res = await validateUsername(values.username);
          if (res.ResponseCode === 200) {
            setIsUnique(res.Data.unique);
            setSuggestions(res.Data.suggestions || []);
          }
        } catch (err) {
          console.error("Error validating username:", err);
        } finally {
          setIsValidating(false);
        }
      }, 600);

      setDebounceTimer(timer);
    } else {
      setIsUnique(null);
      setSuggestions([]);
    }

    return () => clearTimeout(debounceTimer);
  }, [values.username]);

  const handleSuggestionClick = (suggestion) => {
    setFieldValue("username", suggestion);
    setIsUnique(true);
    setSuggestions([]);
  };

    const handleUsernameChange = (e) => {
    handleChange(e);
    if (e.target.value.trim() !== "") {
      setIsUsernameLocked(true);
    } else {
      setIsUsernameLocked(false);
    }
  };

  return (
    <div className="relative">
      <Dropdown
        open={suggestions.length > 0}
        dropdownRender={() => (
          <Menu>
            {suggestions.map((s, idx) => (
              <Menu.Item key={idx} onClick={() => handleSuggestionClick(s)}>
                {s}
              </Menu.Item>
            ))}
          </Menu>
        )}
      >
        <Input
          name="username"
          placeholder="Username"
          value={values.username}
          onChange={(e) => handleUsernameChange(e, handleChange)}
          size="large"
          autoComplete="username"
          className="w-full"
        />
      </Dropdown>

      {isValidating ? (
        <LoadingOutlined className="absolute right-3 top-3 text-gray-500 text-lg" />
      ) : isUnique === true ? (
        <CheckCircleTwoTone
          twoToneColor="#52c41a"
          className="absolute right-3 top-3 text-lg"
        />
      ) : isUnique === false ? (
        <CloseCircleTwoTone
          twoToneColor="#ff4d4f"
          className="absolute right-3 top-3 text-lg"
        />
      ) : null}
    </div>
  );
}
