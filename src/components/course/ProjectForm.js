import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"

import Settings from "../Settings.js"
import { Button } from "@radix-ui/themes"
import { fetchIt } from "../utils/Fetch.js"
import { HelpIcon } from "../../svgs/Help.js"
import { CourseContext } from "./CourseProvider.js"


export const ProjectForm = () => {
    const [books, setBooks] = useState([])
    const [courses, setCourses] = useState([])
    const [title, setTitle] = useState("")
    const [mode, setMode] = useState("create")
    const { getBooks, getCourses, getProject, editProject, getBook } = useContext(CourseContext)
    const [project, updateProject] = useState({
        name: "",
        book: 0,
        course: 0,
        index: 0,
        implementation_url: "",
        active: true,
        is_group_project: false,
        is_advanced_project: false,
        description: "",
        template_url: ""
    })
    const [projectType, setProjectType] = useState("normal");

    const history = useHistory()
    const { projectId, bookId } = useParams()

    useEffect(() => {
        getCourses().then(setCourses)
    }, [])

    
    useEffect(() => {
        const newProject = {...project};
        switch (projectType) {
            case "group": 
                newProject.is_advanced_project=false;
                newProject.is_group_project=true;
                break;
            case "advanced": 
                newProject.is_advanced_project=true;
                newProject.is_group_project=false;
                break;
            default: 
                newProject.is_advanced_project=false;
                newProject.is_group_project=false;
        }
        updateProject(newProject);
    }, [projectType])

    useEffect(() => {
        if (projectId) {
            getProject(projectId).then((project) => {
                updateProject({ ...project, course: project.course.id, book: project.book.id, description: project.info?.description, template_url: project.info?.template_url })
                if (project.is_advanced_project) setProjectType("advanced");
                else if (project.is_group_project) setProjectType("group");
                else setProjectType("normal");
            })
            setMode("edit")
        }
    }, [projectId])

    useEffect(() => {
        if (bookId) {
            getBook(bookId).then((book) => {
                updateProject({ ...project, book: book.id, course: book.course.id })
                setTitle(`${book.course.name} > ${book.name} > New Project`)
            })
            setMode("create")
        }
    }, [bookId])

    useEffect(() => {
        if (project.course !== 0) {
            getBooks(project.course.id).then(setBooks)
        }
    }, [project])

    const constructNewProject = () => {
        const projectData = JSON.stringify(project);
        if (!project.is_advanced_project) {
            projectData.description = "";
            projectData.template_url = "";
        }
        fetchIt(`${Settings.apiHost}/projects`, { method: "POST", body: projectData })
            .then(() => history.push(`/books/${project.book}`))
    }

    const updateState = (event) => {
        const copy = { ...project }

        const newValue = {
            "string": event.target.value,
            "boolean": event.target.checked ? true : false,
            "number": parseInt(event.target.value)
        }[event.target.attributes.controltype.value]

        copy[event.target.id] = newValue
        updateProject(copy)
    }

    return (
        <>
            <form className="projectForm view">
                <h2 className="projectForm__title">{title}</h2>

                <div className="form-group">
                    <label htmlFor="name">
                        Project name
                    </label>
                    <input onChange={updateState}
                        value={project.name}
                        type="text" required autoFocus
                        controltype="string"
                        id="name" className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="index">
                        Position in book
                        <HelpIcon tip="First column project is 0. Second column is 1." />
                    </label>
                    <input onChange={updateState}
                        value={project.index}
                        type="number" required
                        controltype="number"
                        id="index" className="form-control"
                        style={{ maxWidth: "4rem" }}
                    />
                </div>

                <div className="form-group">
                    <div className="radio-option">
                        <input
                            name="projectType"
                            type="radio"
                            value="normal"
                            checked={projectType==="normal"}
                            onChange={ ()=> {setProjectType("normal")}}
                        />
                        <label>Normal</label>
                    </div>
                    <div className="radio-option">
                        <input
                            name="projectType"
                            type="radio"
                            value="group"
                            checked={projectType==="group"}
                            onChange={ ()=> {setProjectType("group")}}
                        />
                        <label>Group</label>
                    </div>
                    <div className="radio-option">
                        <input
                            name="projectType"
                            type="radio"
                            value="advanced"
                            checked={projectType==="advanced"}
                            onChange={ ()=> {setProjectType("advanced")}}
                        />
                        <label>Advanced</label>
                    </div>
                </div>
                
                { project.is_advanced_project &&
                    <>
                        <div className="form-group">
                            <label htmlFor="name">
                                Description
                            </label>
                            <input onChange={updateState}
                                value={project.description}
                                type="text"
                                controltype="string"
                                id="description" className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">
                                Template Url
                            </label>
                            <input onChange={updateState}
                                value={project.template_url}
                                type="url"
                                controltype="string"
                                id="template_url" className="form-control"
                            />
                        </div>
                    </>
                }

                <div className="form-group">
                    <input onChange={updateState}
                        checked={project.active}
                        type="checkbox" required
                        controltype="boolean"
                        id="active"
                    />
                    <label htmlFor="active"> Active </label>
                </div>

                <Button style={{ marginTop: "2rem", marginLeft: "auto" }} color="blue"
                    onClick={evt => {
                        evt.preventDefault()

                        if (mode === "create") {
                            constructNewProject()
                        }
                        else {
                            editProject(project).then(() => history.push(`/books/${project.book}`))
                        }
                    }}>Save</Button>

                <Button style={{ margin: "2rem 0 0 1rem" }} color="crimson"
                    onClick={evt => {
                        evt.preventDefault()
                        history.push(`/books/${project.book}`)
                    }}>Cancel</Button>
            </form>
        </>
    )
}
