export default function Page() {
    return(
      <>
        <div className="flex justify-center p-8 text-lg">
          <p>This is a minimal app implementing a simple lending library for e-books. The client implemented as a Next.js project bootstrapped with create-next-app.</p>
        </div>
        <div className="flex justify-center p-8 text-lg">
          <p>An ASP.NET server implements a REST API and handles DB updates. API calls are made using fetch with CSR.</p>
        </div>
      </>                  
    )
}