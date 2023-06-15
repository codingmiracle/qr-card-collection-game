'use client'

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {Field, Form, Formik} from "formik";
import cn from "classnames";
import * as Yup from "yup";
import {useAuth} from "@/components/Auth/AuthProvider";
import {useRouter} from "next/navigation";

const CodeSchema = Yup.object().shape({
    code: Yup.number().max(999999).min(0).required('required')
});

export default async function Page() {
    const {user} = useAuth()
    const router = useRouter()

    if (!user) {
        return (
            <section className={"flex-center w-full"}>
                <div className={"card-outline-container"}>
                    <h1 id={"scan-guide"}>First steps:</h1>
                    <ul>
                        <li>
                            <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule={"evenodd"}
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                            </svg>
                            <p>Create Account <Link href={"/login"} className={"link text-lg"}>here</Link></p>
                        </li>
                        <li>
                            <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule={"evenodd"}
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                            </svg>
                            <p>Search for QR-Codes</p>
                            <Image src="/qr_code_scanner.svg" width={150} height={150} className="screen-icon ml-8"
                                   alt={"-x-"}></Image>

                        </li>
                        <li>
                            <svg className="w-4 h-4 mr-1.5 text-primary-500 flex-shrink-0" fill="currentColor"
                                 viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule={"evenodd"}
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"></path>
                            </svg>
                            <p>Collect the Shards and puzzle the Cards together</p>
                        </li>
                    </ul>
                </div>
            </section>
        );
    }

    async function onSubmit(formData: any) {
        router.push(`/draw/${formData.code}`)
    }

    return (
        <section className={"flex-center w-full"}>
            <div className={"card-outline-container"}>
                <h2>Enter Code:</h2>
                <Formik initialValues={{code: ""}} validationSchema={CodeSchema} onSubmit={onSubmit}>
                    {({errors, touched}) => (
                        <Form className={"column gap-1 w-full"}>
                            <label htmlFor={"code"}>Code:</label>
                            <Field
                                className={cn('input w-full', errors.code && touched.code && 'border-red-600')}
                                name="code"
                                type="text"
                                placeholder={"123456"}
                            />
                            {errors.code && touched.code ? (
                                <div className={"text-red-600"}>{errors.code}</div>) : null}
                        </Form>
                    )}
                </Formik>
            </div>
        </section>
    );
}