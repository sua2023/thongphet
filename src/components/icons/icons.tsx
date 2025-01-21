import { AiOutlineEyeInvisible, AiOutlineLike, AiTwotonePrinter } from "react-icons/ai";
import { BiCalculator, BiCategoryAlt, BiEdit, BiMessageRoundedDots } from "react-icons/bi";
import { BsCalendar2Date, BsEmojiFrown, BsEyeFill, BsShop, BsThreeDotsVertical } from "react-icons/bs";
import { CiCircleRemove, CiTrash } from "react-icons/ci";
import { FaCircle, FaMapMarkerAlt, FaRegCircle, FaRegCommentDots } from "react-icons/fa";
import { FaPlus, FaRegFileLines, FaUserDoctor } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { GiCheckMark } from "react-icons/gi";
import { GrFormNextLink, GrFormPrevious, GrFormPreviousLink } from "react-icons/gr";
import { HiCheckCircle, HiOutlineShoppingBag } from "react-icons/hi2";
import { IoIosNotificationsOutline, IoIosSearch, IoMdClose, IoMdSend } from "react-icons/io";
import {
  IoAlertSharp,
  IoCloudUploadOutline,
  IoRemoveOutline,
  IoSettingsOutline,
  IoWarningOutline,
} from "react-icons/io5";
import { LuHelpCircle, LuListOrdered } from "react-icons/lu";
import {
  MdCall,
  MdNavigateNext,
  MdOutlineDone,
  MdOutlineExpandLess,
  MdOutlineExpandMore,
  MdOutlineMenu,
  MdOutlineStar,
  MdSaveAlt,
} from "react-icons/md";
import { PiPencilRulerLight } from "react-icons/pi";
import { RiDeleteBin4Line } from "react-icons/ri";
import { RxLockOpen1, RxTable } from "react-icons/rx";
import { VscError } from "react-icons/vsc";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { PiChecks } from "react-icons/pi";
import { TbCheck } from "react-icons/tb";
import { WiTime3 } from "react-icons/wi";
import { TbAuth2Fa } from "react-icons/tb";
import { FaRegCalendarAlt } from "react-icons/fa";
import { PiExport } from "react-icons/pi";

interface IconProps {
  size?: number;
  color?: string;
}

export const ExportIcon = (props: IconProps) => {
  return <PiExport {...props} />;
};
export const TwoFAIcon = (props: IconProps) => {
  return <TbAuth2Fa {...props} />;
};
export const TimeIcon = (props: IconProps) => {
  return <WiTime3 {...props} />;
};
export const CheckIcon1 = (props: IconProps) => {
  return <TbCheck {...props} />;
};
export const DoubleCheckIcon = (props: IconProps) => {
  return <PiChecks {...props} />;
};
export const OutlineCheckedCircleIcon = (props: IconProps) => {
  return <IoMdCheckmarkCircleOutline {...props} />;
};
export const OutlineCircleIcon = (props: IconProps) => {
  return <AiOutlineInfoCircle {...props} />;
};
export const FileIcon = (props: IconProps) => {
  return <FaRegFileLines {...props} />;
};
export const CalendarIcon = (props: IconProps) => {
  return <BsCalendar2Date {...props} />;
};
export const DoneIcon = (props: IconProps) => {
  return <MdOutlineDone {...props} />;
};
export const SendIcon = (props: IconProps) => {
  return <IoMdSend {...props} />;
};

export const CommentIcon = (props: IconProps) => {
  return <FaRegCommentDots {...props} />;
};
export const LikeIcon = (props: IconProps) => {
  return <AiOutlineLike {...props} />;
};
export const SaveIcon = (props: IconProps) => {
  return <MdSaveAlt {...props} />;
};
export const ExpertiseIcon = (props: IconProps) => {
  return <PiPencilRulerLight {...props} />;
};
export const UploadIcon = (props: IconProps) => {
  return <IoCloudUploadOutline {...props} />;
};
export const CategoryIcon = (props: IconProps) => {
  return <BiCategoryAlt {...props} />;
};
export const AlertIcon = (props: IconProps) => {
  return <IoAlertSharp {...props} />;
};
export const EyeVisibleIcon = (props: IconProps) => {
  return <AiOutlineEyeInvisible {...props} />;
};
export const CheckCircleIcon = (props: IconProps) => {
  return <HiCheckCircle {...props} />;
};
export const HelpIcon = (props: IconProps) => {
  return <LuHelpCircle {...props} />;
};
export const UnlockIcon = (props: IconProps) => {
  return <RxLockOpen1 {...props} />;
};
export const TimeTableIcon = (props: IconProps) => {
  return <RxTable {...props} />;
};
export const NextLinkIcon = (props: IconProps) => {
  return <GrFormNextLink {...props} />;
};
export const CallIcon = (props: IconProps) => {
  return <MdCall {...props} />;
};
export const MapIcon = (props: IconProps) => {
  return <FaMapMarkerAlt {...props} />;
};

export const StarIcon = (props: IconProps) => {
  return <MdOutlineStar {...props} />;
};
export const MessageIcon = (props: IconProps) => {
  return <BiMessageRoundedDots {...props} />;
};
export const NotificationIcon = (props: IconProps) => {
  return <IoIosNotificationsOutline {...props} />;
};
export const DoctorIcon = (props: IconProps) => {
  return <FaUserDoctor {...props} />;
};
export const PreviousLinkIcon = (props: IconProps) => {
  return <GrFormPreviousLink {...props} />;
};
export const MenuIcon = (props: IconProps) => {
  return <MdOutlineMenu {...props} />;
};
export const DotsIcon = (props: IconProps) => {
  return <BsThreeDotsVertical {...props} />;
};

export const ShopIcon = (props: IconProps) => {
  return <BsShop {...props} />;
};
export const SettingIcon = (props: IconProps) => {
  return <IoSettingsOutline {...props} />;
};
export const DeleteIcon = (props: IconProps) => {
  return <RiDeleteBin4Line {...props} />;
};
export const EditIcon = (props: IconProps) => {
  return <BiEdit {...props} />;
};

export const UsersIcon = (props: IconProps) => {
  return <FiUsers {...props} />;
};
export const SearchIcon = (props: IconProps) => {
  return <IoIosSearch {...props} />;
};

export const ExpandLessIcon = (props: IconProps) => {
  return <MdOutlineExpandLess {...props} />;
};
export const ExpandMoreIcon = (props: IconProps) => {
  return <MdOutlineExpandMore {...props} />;
};
export const PiCalculatorIcon = (props: IconProps) => {
  return <BiCalculator {...props} />;
};
export const PlusIcon = (props: IconProps) => {
  return <FaPlus {...props} />;
};
export const CircleRemoveIcon = (props: IconProps) => {
  return <CiCircleRemove {...props} />;
};

export const CiTrashIcon = (props: IconProps) => {
  return <CiTrash {...props} />;
};
export const OutlineIcon = (props: IconProps) => {
  return <IoRemoveOutline {...props} />;
};
export const EmojiFrownIcon = (props: IconProps) => {
  return <BsEmojiFrown {...props} />;
};
export const CircleIcon = (props: IconProps) => {
  return <FaCircle {...props} />;
};
export const CircleFullIcon = (props: IconProps) => {
  return <FaRegCircle {...props} />;
};
export const OrderIcon = (props: IconProps) => {
  return <LuListOrdered {...props} />;
};
export const EyeFillIcon = (props: IconProps) => {
  return <BsEyeFill {...props} />;
};
export const PrintIcon = (props: IconProps) => {
  return <AiTwotonePrinter {...props} />;
};
export const CloseIcon = (props: IconProps) => {
  return <IoMdClose {...props} />;
};

export const CheckIcon = (props: IconProps) => {
  return <GiCheckMark {...props} />;
};
export const NextIcon = (props: IconProps) => {
  return <MdNavigateNext {...props} />;
};
export const PreviousIcon = (props: IconProps) => {
  return <GrFormPrevious {...props} />;
};
export const ProductIcon = (props: IconProps) => {
  return <HiOutlineShoppingBag {...props} />;
};
export const WarningIcon = (props: IconProps) => {
  return <IoWarningOutline {...props} />;
};
export const ErrorIcon = (props: IconProps) => {
  return <VscError {...props} />;
};
