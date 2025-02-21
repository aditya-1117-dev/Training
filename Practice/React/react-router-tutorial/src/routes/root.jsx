import {Form, Link, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit} from "react-router-dom";
import {createContact, getContacts,} from "../contacts";
import {useEffect} from "react";

export async function loader({ request }) {
    // const contacts = await getContacts();
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}

export async function action() {
    const contact = await createContact();
    // return { contact };
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
    const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    console.log(navigation.location)

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <>
            <div id="sidebar">
                <h1>React Router Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    {/*<form method="post">*/}
                    {/*    <button type="submit">New</button>*/}
                    {/*</form>*/}
                    <Form method="post">
                        <button type="submit">New-Submit </button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                    {/*<Link to={`contacts/${contact.id}`}>*/}
                                    {/*    {contact.first || contact.last ? (*/}
                                    {/*        <>*/}
                                    {/*            {contact.first} {contact.last}*/}
                                    {/*        </>*/}
                                    {/*    ) : (*/}
                                    {/*        <i>No Name</i>*/}
                                    {/*    )}{" "}*/}
                                    {/*    {contact.favorite && <span>★</span>}*/}
                                    {/*</Link>*/}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
                {/*<nav>*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <a href={`/contacts/1`}>Your Name</a>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <a href={`/contacts/2`}>Your Friend</a>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}
                {/*<nav>*/}
                {/*    <ul>*/}
                {/*        <li>*/}
                {/*            <Link to={`/contacts/1`}>Your Name</Link>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Link to={`contacts/2`}>Your Friend</Link>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</nav>*/}
            </div>
            <div id="detail" className={
                navigation.state === "loading" ? "loading" : ""
            }
            >
                <Outlet/>
            </div>
        </>
    );
}
