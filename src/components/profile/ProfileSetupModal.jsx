import React, { useState } from "react";
import { Modal, Upload, Select, Input, Button, Typography, message } from "antd";
import { PlusOutlined, LoadingOutlined, UploadOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadMedia } from "../../api/media";
import { useDispatch } from "react-redux";
import { updateProfileThunk } from "../../features/profile/profileThunks";
import ImgCrop from 'antd-img-crop';
import PhoneInput from "react-phone-input-2";

const { Title, Text } = Typography;

const validationSchema = Yup.object({
  mobileNo: Yup.string()
    .matches(/^\+?[1-9]\d{7,14}$/, "Enter a valid phone number"),
});


const initialValues = {
  profileImage: null,
  coverImage: null,
  bio: "",
  gender: null,
  mobileNo: "",
};

const getBase64 = (file, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(file);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) message.error("You can only upload JPG/PNG file!");
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) message.error("Image must be smaller than 2MB!");
  return isJpgOrPng && isLt2M;
};

export default function ProfileSetupModal({ open, onClose, onSave }) {
  const dispatch = useDispatch();
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingCover, setLoadingCover] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        let profileUrl = values.profileImage;
        let coverUrl = values.coverImage;

        if (profileUrl && profileUrl instanceof File) {
          const res = await uploadMedia(profileUrl);
          profileUrl = res.Data;
        }

        if (coverUrl && coverUrl instanceof File) {
          const res = await uploadMedia(coverUrl);
          coverUrl = res.Data;
        }

        const payload = {
          bio: values.bio || "",
          gender: values.gender ? values.gender.toLowerCase() : null,
          mobile_number: values.mobileNo || null,
          profile_image_url: profileUrl || null,
          cover_image: coverUrl || null,
        };
        console.log(payload);
        

        const resultAction = await dispatch(updateProfileThunk(payload));
        
        if (updateProfileThunk.fulfilled.match(resultAction)) {
          message.success("Profile updated successfully!");
          onSave(resultAction.payload); // optional callback
        } else {
          message.error(resultAction.payload || "Profile update failed");
        }
      } catch (err) {
        message.error("Something went wrong while saving your profile");
      }
    },
  });

  const handleUpload = async (info, setPreview, key, setLoading) => {
    if (!info.file) return;

    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.originFileObj) {
      try {
        setLoading(true);
        const uploadRes = await uploadMedia(info.file.originFileObj);

        if (uploadRes.ResponseCode === 200) {
          const fileUrl = uploadRes.Data;
          setPreview(fileUrl); // Preview image directly from backend URL
          formik.setFieldValue(key, fileUrl); // Save URL in formik state
        } else {
          message.error(uploadRes.ResponseMessage || "Upload failed");
        }
      } catch (err) {
        message.error("Error uploading image!");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      closable={false}
      centered
      width={580}
      className="backdrop-blur-sm"
      style={{ borderRadius: 18, padding: 20 }}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <Title level={3} className="!text-gray-800 mb-1">
          Welcome to <span className="text-sky-500">LinkUp</span>
        </Title>
        <Text type="secondary">
          Let’s complete your profile to help others know you better
        </Text>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Profile Image */}
        <div>
          <label className="font-semibold">Profile Image</label>
          <ImgCrop rotationSlider>
            <Upload
              name="profileImage"
              listType="picture-circle"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={(info) =>
                handleUpload(info, setProfilePreview, "profileImage", setLoadingProfile)
              }
            >
              {profilePreview ? (
                <img
                  src={profilePreview}
                  alt="profile"
                  style={{ width: "100%", borderRadius: "50%" }}
                />
              ) : (
                <div>
                  {loadingProfile ? <LoadingOutlined /> : <PlusOutlined />}
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </ImgCrop>
        </div>

        {/* Cover Image */}
        <div>
          <label className="font-semibold block mb-1">Cover Image</label>
          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            onChange={(info) =>
              handleUpload(info, setCoverPreview, "coverImage", setLoadingCover)
            }
          >
            {coverPreview ? (
              <img
                src={coverPreview}
                alt="cover"
                style={{
                  width: "100%",
                  height: "130px",
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
            ) : (
              <Button
                icon={loadingCover ? <LoadingOutlined /> : <UploadOutlined />}
                loading={loadingCover}
                className="rounded-lg border-sky-300 text-sky-600 hover:border-sky-400"
              >
                Upload Cover
              </Button>
            )}
          </Upload>
        </div>

        {/* Bio */}
        <div>
          <label className="font-semibold">Bio</label>
          <Input.TextArea
            name="bio"
            placeholder="Write a short bio..."
            rows={3}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-lg border-sky-300 focus:border-sky-400 focus:ring-2 focus:ring-sky-200 transition-all placeholder:text-sky-400"
          />
        </div>

        {/* Gender + Mobile */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="font-semibold">Gender</label>
            <Select
              name="gender"
              placeholder="Select gender"
              value={formik.values.gender}
              onChange={(value) => formik.setFieldValue("gender", value)}
              onBlur={formik.handleBlur}
              className="w-full"
              allowClear
            >
              <Select.Option value="Male">Male</Select.Option>
              <Select.Option value="Female">Female</Select.Option>
              <Select.Option value="Other">Other</Select.Option>
            </Select>
          </div>

          <div>
            <label className="font-semibold">Mobile No</label>
            <div>
              <PhoneInput
                country={"in"} 
                enableSearch={true}
                value={formik.values.mobileNo}
                onChange={(value) => formik.setFieldValue("mobileNo", `+${value}`)}
                onBlur={() => formik.setFieldTouched("mobileNo", true)}
                inputStyle={{
                  width: "100%",
                  borderRadius: "8px",
                  border: "1px solid slate-300",
                  height: "33px",
                  fontSize: "14px",
                  paddingLeft: "48px",
                  color: "#1e293b",
                }}
                buttonStyle={{
                  border: "1px solid slate-300",
                  borderRadius: "4px 0 0 4px",
                }}
                dropdownStyle={{
                  borderRadius: "8px",
                }}
              />
            </div>

            {formik.touched.mobileNo && formik.errors.mobileNo && (
              <div className="text-red-500 text-sm mt-1">
                {formik.errors.mobileNo}
              </div>
            )}
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-3 mt-6">
          <Button onClick={onClose}>Skip</Button>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-sky-500 hover:bg-sky-600"
          >
            Save & Continue
          </Button>
        </div>
      </form>
    </Modal>
  );
}
