// Combines documents and creates one large string

function combineDocuments(docs){
    return docs.map((doc) => doc.pageContent).join('\n\n')
}

export {combineDocuments}