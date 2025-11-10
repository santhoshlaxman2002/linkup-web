// src/components/SearchDrawer.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Drawer, Input, List, Avatar, Spin, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import debounce from "lodash.debounce";
import { clearAllRecentSearchesThunk, clearRecentSearchThunk, fetchRecentSearchesThunk, searchUsersThunk } from "../../features/search/searchThunks";
import { resetRecentSearches, resetSearch, setSearchQuery } from "../../features/search/searchSlice";
import { useNavigate } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";

const SearchDrawer = ({ open, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        users,
        recentSearches,
        loading,
        recentLoading,
        hasMore,
        recentHasMore,
        query,
        offset,
        recentOffset,
    } = useSelector((state) => state.search);

    const [inputValue, setInputValue] = useState("");

    const debouncedSearch = useCallback(
        debounce((value) => {
            dispatch(resetSearch());
            if (value.trim()) {
                dispatch(searchUsersThunk({ query: value, limit: 20, offset: 0 }));
            }
        }, 500),
        [dispatch]
    );

    const handleChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        dispatch(setSearchQuery(value));
        debouncedSearch(value);
    };

    const handleScroll = (e) => {
        const { scrollHeight, scrollTop, clientHeight } = e.target;
        const bottom = scrollHeight - scrollTop <= clientHeight + 50;

        if (inputValue.trim()) {
            // scrolling search results
            if (bottom && hasMore && !loading && query.trim()) {
                dispatch(searchUsersThunk({ query, limit: 20, offset: users.length }));
            }
        } else {
            // scrolling recent search list
            console.log(bottom, recentHasMore, recentLoading);

            if (bottom && recentHasMore && !recentLoading) {
                dispatch(fetchRecentSearchesThunk({ limit: 20, offset: recentOffset }));
            }
        }
    };

    useEffect(() => {
        if (open && !inputValue.trim()) {
            dispatch(resetRecentSearches());
            dispatch(fetchRecentSearchesThunk({ limit: 20, offset: 0 }));
        }
        if (!open) {
            dispatch(resetSearch());
            setInputValue("");
        }
    }, [open, dispatch, inputValue]);

    return (
        <Drawer
            title={<div className="text-lg font-semibold">Search</div>}
            placement="left"
            width={400}
            closable={false}
            onClose={onClose}
            open={open}
            bodyStyle={{ padding: "1rem", backgroundColor: "#fff" }}
        >
            <Input
                placeholder="Search users..."
                value={inputValue}
                onChange={handleChange}
                size="large"
                className="mb-5"
                allowClear
            />
            {/* Clear All button, only for recent list view */}
            {!inputValue.trim() && recentSearches.length > 0 && (
                <div className="flex justify-between">
                    <div className="text-gray-600 font-semibold mb-2">Recent</div>

                    <Button
                        type="text"
                        onClick={() => dispatch(clearAllRecentSearchesThunk())}
                    >
                        Clear All
                    </Button>
                </div>
            )}

            <div
                className="scrollable-list"
                style={{ maxHeight: "calc(100vh - 200px)" }}
                onScroll={handleScroll}
            >
                {inputValue.trim() === "" ? (
                    // Recent Searches View
                    recentLoading && recentSearches.length === 0 ? (
                        <div className="flex justify-center py-10">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={recentSearches}
                            renderItem={(item) => (
                                <List.Item
                                    className="hover:bg-gray-50 rounded-md px-2 cursor-pointer flex items-center justify-between"
                                >
                                    <div
                                        className="flex items-center gap-2 flex-1"
                                        onClick={() => {
                                            onClose();
                                            navigate(`/users/${item.id}`);
                                        }}
                                    >
                                        <Avatar src={item.profile_image_url} size={38} className="bg-gray-400" />
                                        <div className="flex flex-col">
                                            <div className="text-gray-800 font-medium">
                                                {item.first_name} {item.last_name}
                                            </div>
                                            <div className="text-gray-500 text-sm">@{item.username}</div>
                                        </div>
                                    </div>
                                    <CloseOutlined
                                        className="text-gray-400 hover:text-gray-600 pr-6"
                                        onClick={() => dispatch(clearRecentSearchThunk(item.id))}
                                    />
                                </List.Item>
                            )}
                        />
                    )
                ) : (
                    // Regular search results view
                    loading && users.length === 0 ? (
                        <div className="flex justify-center py-10">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <List
                            itemLayout="horizontal"
                            dataSource={users}
                            renderItem={(item) => (
                                <List.Item
                                    className="hover:bg-gray-50 rounded-md px-2 cursor-pointer flex items-center"
                                    onClick={() => {
                                        onClose();
                                        navigate(`/users/${item.id}`);
                                    }}
                                    style={{ alignItems: "center" }}
                                >
                                    <List.Item.Meta
                                        avatar={<Avatar src={item.profile_image_url} size={38} className="bg-gray-400" />}
                                        title={<div className="text-gray-800 font-medium">{item.first_name} {item.last_name}</div>}
                                        description={`@${item.username}`}
                                    />
                                </List.Item>
                            )}
                        />
                    )
                )}
                {(inputValue.trim() === "" ? recentLoading : loading) &&
                    (inputValue.trim() === "" ? recentSearches.length > 0 : users.length > 0) && (
                        <div className="text-center py-3">
                            <Spin />
                        </div>
                    )}
            </div>
        </Drawer>
    );
};


export default SearchDrawer;
