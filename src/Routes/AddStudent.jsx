import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button, Input, FormControl, FormLabel, Box, Select, Image, Heading } from "@chakra-ui/react";
import Footer from "../components/Footer";

const AddStudent = () => {
    // TODO: answer here
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        fullname: "",
        profilePicture: "",
        address: "",
        phoneNumber: "",
        birthDate: "",
        gender: "",
        programStudy: "",
    });

    useEffect(() => {
        fetch(`http://localhost:3001/student/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            fullname,
            profilePicture,
            address,
            phoneNumber,
            birthDate,
            gender,
            programStudy,
        } = formData;

        const faculty = getFacultyByProgramStudy(programStudy);

        const newStudent = {
            fullname,
            profilePicture,
            address,
            phoneNumber,
            birthDate,
            gender,
            faculty,
            programStudy,
        };

        fetch("http://localhost:3001/student", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newStudent),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success", data);
                navigate("/student");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getFacultyByProgramStudy = (programStudy) => {
        let faculty = "";
        switch (programStudy) {
            case "Ekonomi":
            case "Manajemen":
            case "Akuntansi":
                faculty = "Fakultas Ekonomi";
                break;
            case "Administrasi Publik":
            case "Administrasi Bisnis":
            case "Hubungan Internasional":
                faculty = "Fakultas Ilmu Sosial dan Politik";
                break;
            case "Teknik Sipil":
            case "Arsitektur":
                faculty = "Fakultas Teknik";
                break;
            case "Matematika":
            case "Fisika":
            case "Informatika":
                faculty = "Fakultas Teknologi Informasi dan Sains";
                break;
            default:
                faculty = "";
                break;
        }
        return faculty;
    };

    return (
        <>
            {/* TODO: answer here */}
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                padding="20px"
            >
                <Box
                    width={["100%", "80%", "60%", "40%"]}
                    padding="40px"
                    backgroundColor="white"
                    borderRadius="8px"
                    boxShadow="md"
                >
                    <form id="form-student" onSubmit={handleSubmit}>
                        <Heading as="h1" size="xl" textAlign="center" marginBottom="4">
                            Add Student
                        </Heading>
                        <FormControl marginBottom="20px">
                            <FormLabel>Profile Picture:</FormLabel>
                            {formData.profilePicture && (
                                <Box marginBottom="20px">
                                    <Image
                                        src={formData.profilePicture}
                                        alt="Profile"
                                        data-testid="previousPicture"
                                        className="img-profile"
                                        boxSize={["150px", "200px", "250px", "300px"]}
                                        width="250px"
                                        height="250px"
                                        borderRadius="full"
                                        mx="auto"
                                    />
                                </Box>
                            )}
                            <Input
                                type="text"
                                name="profilePicture"
                                value={formData.profilePicture}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl marginBottom="20px">
                            <FormLabel>Fullname:</FormLabel>
                            <Input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl marginBottom="20px">
                            <FormLabel>Address:</FormLabel>
                            <Input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl marginBottom="20px">
                            <FormLabel>Phone Number:</FormLabel>
                            <Input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl marginBottom="20px">
                            <FormLabel>Birth Date:</FormLabel>
                            <Input
                                type="date"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl marginBottom="20px">
                            <FormLabel>Gender:</FormLabel>
                            <Select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Gender --</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </Select>
                        </FormControl>
                        <FormControl marginBottom="20px">
                            <FormLabel>Program Study:</FormLabel>
                            <Select
                                name="programStudy"
                                value={formData.programStudy}
                                onChange={handleChange}
                            >
                                <option value="">-- Select Program Study --</option>
                                <option value="Ekonomi">Ekonomi</option>
                                <option value="Manajemen">Manajemen</option>
                                <option value="Akuntansi">Akuntansi</option>
                                <option value="Administrasi Publik">Administrasi Publik</option>
                                <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                                <option value="Hubungan Internasional">
                                    Hubungan Internasional
                                </option>
                                <option value="Teknik Sipil">Teknik Sipil</option>
                                <option value="Arsitektur">Arsitektur</option>
                                <option value="Matematika">Matematika</option>
                                <option value="Fisika">Fisika</option>
                                <option value="Informatika">Informatika</option>
                            </Select>
                        </FormControl>
                        <Button type="submit" colorScheme="blue" width="100%">
                            Add Student
                        </Button>
                    </form>
                </Box>
            </Box>
            <Footer />
        </>
    );
};

export default AddStudent;
