
function AuthLayout({ children }: { children: React.ReactNode}) {
    return (
        <div className="flex justify-center mt-[10vh]">
            { children }
        </div>
    );
}

export default AuthLayout;
