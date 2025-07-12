
            // const { useCase, model } = formFields;

            // const allowedUseCases = FileModelUseCaseValidatorOptions[model];
            // if (!allowedUseCases?.includes(useCase)) {
            //   res
            //     .status(400)
            //     .json({ error: 'Invalid model/useCase combination' });
            //   fileStream.resume();
            //   return;
            // }

            // const validation: FileValidationOptions =
            //   validationOptions[useCase];
            // if (!validation) {
            //   res
            //     .status(400)
            //     .json({ error: 'No validation rule for this useCase' });
            //   fileStream.resume();
            //   return;
            // }

            // const fileExtension: FileTypeEnum = FileTypeEnum[metadata.mimeType];

            // if (!validation.acceptedFormats.includes(fileExtension)) {
            //   res.status(400).json({ error: 'Invalid file format' });
            //   fileStream.resume();
            //   return;
            // }