declare module 'fumble' {
    const http: {
        badGateway: (message?: string, options?: { debug?: any }) => HttpError;
        badRequest: (message?: string, options?: { debug?: any }) => HttpError;
        conflict: (message?: string, options?: { debug?: any }) => HttpError;
        create: (status?: number, message?: string, options?: { debug?: any }) => HttpError;
        forbidden: (message?: string, options?: { debug?: any }) => HttpError;
        gone: (message?: string, options?: { debug?: any }) => HttpError;
        internalServerError: (message?: string, options?: { debug?: any }) => HttpError;
        methodNotAllowed: (message?: string, options?: { debug?: any }) => HttpError;
        notFound: (message?: string, options?: { debug?: any }) => HttpError;
        notImplemented: (message?: string, options?: { debug?: any }) => HttpError;
        preconditionFailed: (message?: string, options?: { debug?: any }) => HttpError;
        proxyAuthenticationRequired: (message?: string, options?: { debug?: any }) => HttpError;
        serviceUnavailable:(message?: string, options?: { debug?: any }) => HttpError;
        tooManyRequests: (message?: string, options?: { debug?: any }) => HttpError;
        unauthorized: (message?: string, options?: { debug?: any }) => HttpError;
    };

    class HttpError extends Error {
        debug?: any;
        statusCode: number;
    }
}
