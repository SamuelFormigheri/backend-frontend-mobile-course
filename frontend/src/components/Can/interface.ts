export default interface ICan{
    checkRole?: string;
    checkPermission?: string;
    auth?: any;
    children: React.ReactNode;
}