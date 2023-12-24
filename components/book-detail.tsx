import useToggle from "@/hooks/use-toggle";
import { Book, BookDetailInfo } from "@/models/book.model";
import { dateFormatted } from "@/utils/helper";
import { Divider, Rate, Skeleton, Space, Tag, Typography } from "antd";
import React from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

interface Props {
  book: BookDetailInfo;
}

function BookDetail({ book }: Props) {
  if (!book)
    return (
      <Space direction="vertical" size="middle" className="w-full">
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </Space>
    );
  const [showFull, toggleShowFull] = useToggle(false);
  const str =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur doloremque aut maxime repellendus error tempora ad, aspernatur optio animi veritatis saepe nemo quidem dolorum, molestias rem ipsam fugiat! Quam et possimus necessitatibus nisi neque. Officiis harum repellendus magnam, magni consequuntur, dignissimos maxime deserunt dolore incidunt, ad sunt nesciunt veniam. Aliquid minima eveniet earum labore at praesentium blanditiis officia cupiditate nihil! Corporis exercitationem est minus recusandae saepe maiores dignissimos velit voluptatum minima dolor, in sapiente praesentium harum earum suscipit laborum vitae sint accusantium inventore neque eius odio nam? Eveniet a porro sapiente illum molestiae ducimus, laborum eligendi culpa nisi incidunt, ut sequi dolor eum officiis qui vero assumenda? Minus quae excepturi eum architecto qui sapiente, exercitationem aliquam placeat. Numquam commodi delectus laudantium eos reprehenderit? Accusamus deleniti, possimus sequi dicta rerum, est praesentium quia dolor doloremque consequatur minus, perspiciatis odit cumque eveniet in? Similique quam tempore repellendus totam, recusandae minima quos molestias animi, veritatis reiciendis perferendis pariatur? Ducimus similique delectus expedita tempore iste modi cupiditate quod laudantium consectetur dicta quia dolores adipisci voluptate, voluptatum fugit quos explicabo distinctio aut ad quae consequatur obcaecati esse? A labore quaerat quibusdam modi veritatis, atque at quo accusamus consequatur non aspernatur ab, assumenda, ea voluptate expedita maiores debitis. Dolore assumenda fugit, quia voluptate ea quos harum maxime quam iusto minus corrupti ipsa. Eveniet rem modi repudiandae explicabo velit. Mollitia, impedit! Totam nostrum nesciunt nemo ea quam libero laboriosam ratione pariatur, expedita ullam sequi, officia ipsum, rem praesentium saepe? Maiores odit autem facere porro. Doloribus fugiat odio nemo ducimus eveniet? Excepturi rem tempore dolor modi velit iste maxime ipsa ipsam accusamus, voluptate optio. Ut quaerat iure exercitationem ipsam in, delectus laborum quisquam reiciendis! Doloremque eius optio perspiciatis iure consequuntur porro neque, dolorem id inventore unde suscipit cum impedit, culpa recusandae maiores ipsum. Ipsum consequatur sed voluptates porro culpa debitis eos animi placeat velit at quis, minima hic earum. Quos qui vel facere illum incidunt! Laboriosam alias soluta, itaque ratione distinctio, reprehenderit rerum voluptate aperiam explicabo sunt aliquid sint quam dicta dolore sequi atque? Quas expedita totam, quos, cupiditate rerum tempore consectetur dignissimos porro quod nisi optio atque neque, deleniti dolor voluptatum quisquam repellendus ab nam repellat ducimus aut recusandae. Totam nihil, aut consequatur impedit ut officiis necessitatibus quisquam architecto odit ratione excepturi autem repudiandae quod temporibus voluptates. Tempora ex maiores neque doloremque, quas placeat, earum ipsa vitae eaque aperiam possimus, sequi expedita ducimus ullam inventore consectetur. Fugiat!";

  
  return (
    <Space direction="vertical" className="w-full">
      <Typography.Title>{book.name}</Typography.Title>
      <h3 className="text-2xl font-light tracking-wide mb-1">
        {book.author}
      </h3>
      <div className="flex items-center gap-6">
        <Rate
          value={4}
          disabled
          className="translate-y-1"
        />
        <h4 className="text-2xl font-medium font-serif tracking-wider">
          4.2/5
        </h4>
        <span className="text-slate-700 font-semibold">
          {book.view_count} viewer
        </span>
      </div>
      <Typography.Paragraph className="text-base mt-3">
        {showFull ? (
          <div>
            <div className="mb-3">{str}</div>
            <span
              onClick={() => toggleShowFull(false)}
              className="cursor-pointer hover:underline ease-in-out text-neutral-600 text-sm font-medium"
            >
              Ẩn bớt <CaretUpOutlined />
            </span>
          </div>
        ) : (
          <div>
            <div className="max-paragraph-8 mb-3">{str}</div>
            <span
              onClick={() => toggleShowFull(true)}
              className="cursor-pointer hover:underline ease-in-out text-neutral-600 text-sm font-medium"
            >
              Xem thêm <CaretDownOutlined />
            </span>
          </div>
        )}
      </Typography.Paragraph>
      <div className="flex items-center">
        <span className="text-slate-700 font-medium text-sm mr-3">
          Thể loại
        </span>
        <Tag bordered={false} color="green">
          {book.category}
        </Tag>
      </div>
      <div className="text-slate-700 font-medium text-sm">
        <p className="mb-2">Ngày xuất bản: {dateFormatted(book.release_date)}</p>
        <p className="mb-2">Nhà xuất bản: {book.nsx}</p>
      </div>
    </Space>
  );
}

export default BookDetail;
