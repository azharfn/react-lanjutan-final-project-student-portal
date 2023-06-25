// TODO: answer here
import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Link as RouterLink } from "react-router-dom";
import {
    Heading,
    Box,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Link,
    Button,
    Tfoot
} from "@chakra-ui/react";

const Student = () => {
    // TODO: answer here
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3001/student");
            const data = await response.json();
            setStudents(data);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`http://localhost:3001/student/${id}`, {
                method: "DELETE",
            });
            setStudents((prevStudents) =>
                prevStudents.filter((student) => student.id !== id)
            );
        } catch (error) {
            console.log("Error deleting student:", error);
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredStudents =
        filter === "All"
            ? students
            : students.filter((student) => student.faculty === filter);

    return (
        <>
            <Box className="student-data" 
            p={4} 
            m={[10, 0, 10, 0]}>
                <Box className="container">
                    <Heading as="h1" m={4}
                    bgImage="https://img.freepik.com/free-vector/collection-graduating-students_1262-19749.jpg?w=1060&t=st=1687703589~exp=1687704189~hmac=27d43046b309051c7eeb5b6245d9afd54bae3d31713a8954e8144df741fbc3d8" // Ganti dengan path gambar yang sesuai
                    bgSize="cover"
                    bgPosition="center 20%"
                    color="#9AE6B4"
                    textAlign="center"
                    py={8}
                    boxShadow="0px 2px 4px rgba(0, 0, 0, 0.4)" // Menambahkan boxShadow
                    borderRadius="20px"
                    >
                        Daftar Mahasiswa
                    </Heading>
                    <Select
                        value={filter}
                        onChange={handleFilterChange}
                        data-testid="filter"
                        width={{ base: "100%", md: "200px" }} // Lebar seleksi responsif
                        mb={4}
                    >
                        <option value="All">All</option>
                        <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
                        <option value="Fakultas Ilmu Sosial dan Politik">
                            Fakultas Ilmu Sosial dan Politik
                        </option>
                        <option value="Fakultas Teknik">Fakultas Teknik</option>
                        <option value="Fakultas Teknologi Informasi dan Sains">
                            Fakultas Teknologi Informasi dan Sains
                        </option>
                    </Select>
                </Box>
                {loading ? (
                    <p>Loading ...</p>
                ) : (
                    <TableContainer>
                        <Table variant="striped" colorScheme="teal">
                            <TableCaption>Data Mahasiswa</TableCaption>
                            <Thead>
                                <Tr>
                                    <Th>No</Th>
                                    <Th>Full Name</Th>
                                    <Th>Birth Date</Th>
                                    <Th>Gender</Th>
                                    <Th>Faculty</Th>
                                    <Th>Program Study</Th>
                                    <Th>Option</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {filteredStudents.map((student, index) => (
                                    <Tr key={student.id}>
                                        <Td>{index + 1}</Td>
                                        <Td>
                                            <Link
                                                as={RouterLink}
                                                to={`/student/${student.id}`}
                                                color="teal.500"
                                                fontWeight="bold"
                                                _hover={{ textDecoration: "underline" }}
                                            >
                                                {student.fullname}
                                            </Link>
                                        </Td>
                                        <Td>{student.birthDate}</Td>
                                        <Td>{student.gender}</Td>
                                        <Td>{student.faculty}</Td>
                                        <Td>{student.programStudy}</Td>
                                        <Td>
                                            <Button
                                                colorScheme="red"
                                                size="sm"
                                                onClick={() => handleDelete(student.id)}
                                            >
                                                Delete
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                            <Tfoot></Tfoot>
                            <TableCaption>
                                ©Student table by: Azhar Fauzan Nugroho
                            </TableCaption>
                        </Table>
                    </TableContainer>
                )}
            </Box>
            <Footer />
        </>
    );
};

export default Student;
