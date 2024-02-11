import { dataSource } from '..';
import { categories } from './categories';

export const seed = async (): Promise<void> => {
  try {
    await dataSource.initialize();

    for (const { name, color, id } of categories) {
      const existingCategory = await dataSource
        .createQueryRunner()
        .query(`select * from Category where id = '${id}'`);

      console.log(existingCategory);

      if (!existingCategory) {
        await dataSource
          .createQueryRunner()
          .query(
            `INSERT INTO Category (id, color, name) VALUES ('${id}','${color}', '${name}')`,
          );
      }
    }

    console.log('Categories inserted successfully!');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

seed();
