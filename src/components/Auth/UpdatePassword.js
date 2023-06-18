'use client';

import {useState} from 'react';
import cn from 'classnames';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';

import supabase from 'src/lib/supabase-browser';

const UpdatePasswordSchema = Yup.object().shape({
    password: Yup.string().required('Required'),
});

const UpdatePassword = () => {
    const [errorMsg, setErrorMsg] = useState(null);

    async function updatePassword(formData) {
        const {error} = await supabase.auth.updateUser({
            password: formData.password,
        });

        if (error) {
            setErrorMsg(error.message);
        }
    }

    return (
        <section className={"flex-center"}>
            <div className="card-container">
                <h3>Update Password</h3>
                <Formik
                    initialValues={{
                        password: '',
                    }}
                    validationSchema={UpdatePasswordSchema}
                    onSubmit={updatePassword}
                >
                    {({errors, touched}) => (
                        <Form className="column w-full">
                            <div className={"column gap-1 w-full"}>
                                <label htmlFor={"password"}>Password</label>
                                <Field
                                    className={cn('input w-full', errors.password && touched.password && 'border-red-600')}
                                    name="password"
                                    type="password"
                                />
                                {errors.password && touched.password ? (
                                    <div className={"text-red-600"}>{errors.password}</div>) : null}
                            </div>
                            <button className="button w-full" type="submit">
                                Update Password
                            </button>
                        </Form>
                    )}
                </Formik>
                {errorMsg && <div className="text-red-600">{errorMsg}</div>}
            </div>
        </section>
    );
};

export default UpdatePassword;