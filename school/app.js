function showProgram(program) {

```
const details =
    document.getElementById("programDetails");

if (program === "law") {

    details.innerHTML = `
        <h3>Law Foundations Bootcamp</h3>

        <ul>
            <li>Introduction to Law</li>
            <li>Constitutional Principles</li>
            <li>Contracts & Agreements</li>
            <li>Civil vs Criminal Law</li>
            <li>Legal Research Basics</li>
        </ul>
    `;
}

if (program === "tech") {

    details.innerHTML = `
        <h3>Technology & Policy</h3>

        <ul>
            <li>Artificial Intelligence Governance</li>
            <li>Cybersecurity Policy</li>
            <li>Privacy Regulations</li>
            <li>Intellectual Property</li>
            <li>Digital Ethics</li>
        </ul>
    `;
}

if (program === "civic") {

    details.innerHTML = `
        <h3>Civic Leadership</h3>

        <ul>
            <li>Public Administration</li>
            <li>Communication Skills</li>
            <li>Project Leadership</li>
            <li>Community Engagement</li>
            <li>Strategic Planning</li>
        </ul>
    `;
}
```

}
