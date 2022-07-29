declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}
declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}
interface IPlanObj {
  [key: string]: any;
}
