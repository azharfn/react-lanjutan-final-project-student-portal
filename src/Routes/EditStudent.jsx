// TODO: answer here
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Box, FormControl, FormLabel, Select, Heading, Image } from "@chakra-ui/react";
import Footer from "../components/Footer";

const EditStudent = () => {
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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/student/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error:", error);
                setLoading(false);
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
        setLoading(true);

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

        const updatedStudent = {
            fullname,
            profilePicture,
            address,
            phoneNumber,
            birthDate,
            gender,
            faculty,
            programStudy,
        };

        fetch(`http://localhost:3001/student/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedStudent),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success", data);
                navigate("/student");
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setLoading(false);
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

    if (loading) {
        return <p>Loading ...</p>;
    }

    return (
        <>
            {/* TODO: answer here */}
            <Box 
            className="box" 
            width={["95%", "85%", "80%", "60%"]} 
            margin="0 auto"
            >
                <Box className="form-container" padding="20px">
                    <form id="form-student" 
                    onSubmit={handleSubmit} 
                    style={{ boxShadow: "0px 0px 0px 0.5px #7f8c8d", padding: "1rem", borderRadius: "10px" }}
                    >
                        <Heading as="h1" size="xl" textAlign="center" marginBottom="4">
                            Edit Student
                        </Heading>
                        <Box className="box-form">
                            <Box className="Input-box">
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
                                <FormControl marginBottom="20px">
                                    <FormLabel>Fullname:</FormLabel>
                                    <Input
                                        type="text"
                                        name="fullname"
                                        value={formData.fullname}
                                        onChange={handleChange}
                                        data-testid="name"
                                    />
                                </FormControl>
                                <FormControl marginBottom="20px">
                                    <FormLabel>Address:</FormLabel>
                                    <Input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        data-testid="address"
                                    />
                                </FormControl>
                                <FormControl marginBottom="20px">
                                    <FormLabel>Phone Number:</FormLabel>
                                    <Input
                                        type="text"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        data-testid="phoneNumber"
                                    />
                                </FormControl>
                                <Box display="flex" justifyContent="space-between" marginBottom="20px">
                                    <FormControl flexBasis="48%">
                                        <FormLabel>Birth Date:</FormLabel>
                                        <Input
                                            type="date"
                                            name="birthDate"
                                            value={formData.birthDate}
                                            onChange={handleChange}
                                            data-testid="date"
                                        />
                                    </FormControl>
                                    <FormControl flexBasis="48%">
                                        <FormLabel>Gender:</FormLabel>
                                        <Select
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            data-testid="gender"
                                        >
                                            <option value="">-- Select Gender --</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </Select>
                                    </FormControl>
                                </Box>
                                <FormControl marginBottom="20px">
                                    <FormLabel>Program Study:</FormLabel>
                                    <Select
                                        name="programStudy"
                                        value={formData.programStudy}
                                        onChange={handleChange}
                                        data-testid="prody"
                                    >
                                        <option value="">-- Select Program Study --</option>
                                        <option value="Ekonomi">Ekonomi</option>
                                        <option value="Manajemen">Manajemen</option>
                                        <option value="Akuntansi">Akuntansi</option>
                                        <option value="Administrasi Publik">Administrasi Publik</option>
                                        <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                                        <option value="Hubungan Internasional">Hubungan Internasional</option>
                                        <option value="Teknik Sipil">Teknik Sipil</option>
                                        <option value="Arsitektur">Arsitektur</option>
                                        <option value="Matematika">Matematika</option>
                                        <option value="Fisika">Fisika</option>
                                        <option value="Informatika">Informatika</option>
                                    </Select>
                                </FormControl>
                                <Button
                                    id="edit-btn"
                                    type="submit"
                                    marginBottom="20px"
                                    data-testid="edit-btn"
                                    bg="teal"
                                    color="white"
                                >
                                    Edit Student
                                </Button>
                            </Box>
                        </Box>
                    </form>
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default EditStudent;