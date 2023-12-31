import { Box, Button, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import useBlogCall from "../hooks/useBlogCall";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewBlog = ({ info, setInfo }) => {
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.blog);
  const { createBlog, getBlogCategories, updateBlog } = useBlogCall();

  useEffect(() => {
    getBlogCategories();
  }, []);

  const data = categories?.data;
  console.log(data);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
    console.log(info);
  };
  const handleSubmit = (e) => {
    console.log(info);
    e.preventDefault();
    info?.id ? updateBlog(info) : createBlog(info);
    console.log(info);
    navigate("/");
    setInfo({
      title: "",
      content: "",
      image: "",
      category: "",
      status: "",
    });
  };
  return (
    <div style={{ marginTop: "2rem", }}>
      <Box>
        <Paper
           elevation={3}
           sx={{
             width: "15rem",
             padding: "1rem",
             margin: "auto",
             
           }}
           padding={10}
        >
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2,backgroundColor: "rgba(255, 255, 255, 0.9)"  }}
            component="form"
            onSubmit={handleSubmit}
          >
            <h2>New Blog</h2>
            <TextField
              label="Title"
              id="Title"
              type="text"
              variant="outlined"
              name="title"
              value={info?.title || ""}
              onChange={handleChange}
              required
            />
            <TextField
              label="Image URL"
              id="image"
              type="url"
              variant="outlined"
              name="image"
              value={info?.image || ""}
              onChange={handleChange}
              required
            />
            <Select
              label="Category"
              id="category"
              name="category"
              value={info?.category || ""}
              onChange={handleChange}
              required
            >
              {/* <MenuItem onClick={() => navigate("/stock/products")}>
                category
              </MenuItem> */}
              <hr />
              {data?.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>

            {/* <MenuItem >
                      rtzrtz
                    </MenuItem>
                    </Select>  */}
            {/* Seconf Select */}

            <Select
              label="Status"
              id="status"
              name="status"
              value={info?.status || ""}
              onChange={handleChange}
              required
            >
              <MenuItem key={"d"} value={"d"}>
                Draft
              </MenuItem>
              <MenuItem key={"p"} value={"p"}>
                Pulished
              </MenuItem>
              {/* <hr />
                {products?.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  )
                })} */}
            </Select>
            <TextField
              id="outlined-textarea"
              label="Content"
              placeholder="Content"
              multiline
              name="content"
              value={info?.content || ""}
              onChange={handleChange}
            />
            <Button type="submit" variant="contained" size="large">
              {info?.id ? "Update Blog" : "Add New Blog"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </div>
  );
};

export default NewBlog;
