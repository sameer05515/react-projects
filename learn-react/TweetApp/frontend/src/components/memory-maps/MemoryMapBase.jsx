import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchLinks } from "../../redux/slices/linksSlice";
import {
    fetchTopics
} from "../../redux/slices/topicSlice";

const MemoryMapBase = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTopics());
        dispatch(fetchLinks());
    }, [dispatch]);

    return (        
        <div>
            <Outlet />
        </div>
    );
};

export default MemoryMapBase;
