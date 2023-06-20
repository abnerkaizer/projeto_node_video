const router = require("express").Router();
const Person = require("../models/Person");

//Criar pessoa
router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };
  if (!name) {
    res.status(422).json({ error: "Nome não foi fornecido" });
    return;
  }
  try {
    //Criando o dado
    await Person.create(person);
    //Resposta que o dado foi criado com sucesso
    res.status(201).json({ message: "Pessoa inserida no banco com sucesso." });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Ler pessoas do banco

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Buscar uma pessoa pelo id dela
router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    if (!person) {
      res.status(422).json({ error: "Pessoa não encontrada." });
      return;
    }

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Atualizar uma pessoa - PUT, PATCH

router.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const { name, salary, approved } = req.body;
  const person = {
    name,
    salary,
    approved,
  };
  try {
    const updatedPerson = await Person.updateOne({ _id: id }, person);
    if (updatedPerson.matchedCount === 0) {
      res.status(422).json({ error: "Pessoa não encontrada." });
      return;
    }
    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//Deletar pessoa - DELETE

router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  const person = await Person.findOne({ _id: id });

  if (!person) {
    res.status(422).json({ error: "Pessoa não encontrada." });
    return;
  }

  try {
    await Person.deleteOne({ _id: id });

    res.status(200).json({ message: "Pessoa removida com sucesso." });
  } catch (error) {
    res.status(500).json({ erro: error });
  }
});
module.exports = router;
