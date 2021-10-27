import React, {useState} from "react";
import ColorSlides from './ColorSlides';

function loadComponent(scope, module) {
    return async () => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        await __webpack_init_sharing__("default");
        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        await container.init(__webpack_share_scopes__.default);
        const factory = await window[scope].get(module);
        const Module = factory();
        return Module;
    };
}

const useDynamicScript = (args) => {
    const [ready, setReady] = React.useState(false);
    const [failed, setFailed] = React.useState(false);

    React.useEffect(() => {
        if (!args.url) {
            return;
        }

        const element = document.createElement("script");

        element.src = args.url;
        element.type = "text/javascript";
        element.async = true;

        setReady(false);
        setFailed(false);

        element.onload = () => {
            console.log(`Dynamic Script Loaded: ${args.url}`);
            setReady(true);
        };

        element.onerror = () => {
            console.error(`Dynamic Script Error: ${args.url}`);
            setReady(false);
            setFailed(true);
        };

        document.head.appendChild(element);

        return () => {
            console.log(`Dynamic Script Removed: ${args.url}`);
            document.head.removeChild(element);
        };
    }, [args.url]);

    return {
        ready,
        failed
    };
};

function System(props) {
    const {ready, failed} = useDynamicScript({
        url: props.system && props.system.url
    });

    if (!props.system) {
        return <h2>Not system specified</h2>;
    }

    if (!ready) {
        return <h2>Loading dynamic script: {props.system.url}</h2>;
    }

    if (failed) {
        return <h2>Failed to load dynamic script: {props.system.url}</h2>;
    }

    const Component = React.lazy(
        loadComponent(props.system.scope, props.system.module)
    );

    return (
        <React.Suspense fallback="Loading System">
            <Component/>
        </React.Suspense>
    );
}

const App = () => {
    const [system, setSystem] = React.useState(undefined);

    function setApp2() {
        setSystem({
            url: url,
            scope: "app2",
            module: "./SharedButton"
        });
    }

    const [fetchApp2, setFetchApp2] = useState(0);
    const [url, setUrl] = useState("http://localhost:3002/remoteEntry.js");
    return (
        <div>
            <h2 style={{textAlign: 'center'}}>App1, Shared Slides</h2>
            <ColorSlides/>
            <input onChange={(e)=>setUrl(e.target.value)} value={url} style={{width:1000}}/>
            <button
                onClick={() => {
                    setFetchApp2((currentFetch) => currentFetch + 1);
                    setApp2();
                }}
                style={{marginBottom: "2rem"}}
            >
                Dynamically Fetch App2
            </button>
            {fetchApp2 ?
                <React.Suspense fallback="Loading Button">
                    <System system={system} />
                </React.Suspense>
                :
                null}
        </div>
    )
};

export default App;
